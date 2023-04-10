terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }

  required_version = ">= 1.2.0"
}

provider "aws" {
  region  = "ap-southeast-2"
}

resource "aws_key_pair" "deployer" {
  key_name   = "QuaefactaKey"
  public_key = "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQCnAU68QInaOTnH7ohTNjW1i8IAUvkuK2K4HFYSTpgUwc8VVMx5+3QPI30a6dMUhpOEgRx1D3napuSIfk/3BfO979U2+MVyiCR156nmOWUSLOKXijtlP7/yImOsQLNO0AmaKzvunZB+iOVe/EyyffDVlc/OCc+uDsZWK5cba0DJzOVGOlN7vT/nKjq7Q1UUjYE8KAznUKpha0CmVAcOpvBrzkUDFSngO2gU8z3VGFd6Q6pM7S4Mjs5DsgiUWAaTGhiRqUnc7rtJhwDIvtgrb4w5J9FYtcHeoc9G3yupdxR9AwsJ/WCC//UyMKhdWbHb+WXpD+MVthmlRfUCuA9Ckj3X rsa-key-20221002"
}

resource "aws_vpc" "VPC" {
  cidr_block = "10.0.0.0/16"

  tags = {
    Name = "QuaefactaHealthApp-vpc"
  }
}

resource "aws_internet_gateway" "igw" {
    vpc_id = aws_vpc.VPC.id
    tags = {
        Name = "igw"
    }
}

resource "aws_subnet" "PrivateSubnet1" {
  vpc_id            = aws_vpc.VPC.id
  cidr_block        = "10.0.96.0/20"
  availability_zone = "ap-southeast-2a"

  tags = {
    Name = "QuaefactaHealthApp-subnet-private1-ap-southeast-2a"
  }
}

resource "aws_subnet" "PrivateSubnet2" {
  vpc_id            = aws_vpc.VPC.id
  cidr_block        = "10.0.80.0/20"
  availability_zone = "ap-southeast-2b"

  tags = {
    Name = "QuaefactaHealthApp-subnet-private2-ap-southeast-2b"
  }
}

resource "aws_subnet" "PublicSubnet" {
  vpc_id            = aws_vpc.VPC.id
  cidr_block        = "10.0.0.0/20"
  availability_zone = "ap-southeast-2a"

  tags = {
    Name = "QuaefactaHealthApp-subnet-public-ap-southeast-2a"
  }
}

resource "aws_route_table" "public_rt" {
    vpc_id = aws_vpc.VPC.id
    route {
        cidr_block = "0.0.0.0/0"
        gateway_id = aws_internet_gateway.igw.id
    }
}

resource "aws_route_table_association" "public" {
    route_table_id = aws_route_table.public_rt.id
    subnet_id = aws_subnet.PublicSubnet.id
}

resource "aws_route_table" "private_rt" {
    vpc_id = aws_vpc.VPC.id
    route {
        cidr_block = "0.0.0.0/0"
        gateway_id = aws_internet_gateway.igw.id
    }
}

resource "aws_route_table_association" "private1" {
    route_table_id = aws_route_table.private_rt.id
    subnet_id = aws_subnet.PrivateSubnet1.id
}

resource "aws_route_table_association" "private2" {
    route_table_id = aws_route_table.private_rt.id
    subnet_id = aws_subnet.PrivateSubnet2.id
}

resource "aws_security_group" "ec2_security_group" {
  name        = "ec2_security_group"
  description = "Quaefacta app ec2 instance security group"
  vpc_id      = aws_vpc.VPC.id

  ingress {
    from_port        = 80
    to_port          = 80
    protocol         = "tcp"
    cidr_blocks      = ["0.0.0.0/0"]
  }

  ingress {
    from_port        = 22
    to_port          = 22
    protocol         = "tcp"
    cidr_blocks      = ["0.0.0.0/0"]    //this should be changed to only the ip of the person ssh'ing in to the ec2 instance for security
  }

  ingress {
    from_port        = 443
    to_port          = 443
    protocol         = "tcp"
    cidr_blocks      = ["0.0.0.0/0"]
  }

  egress {
    from_port        = 0
    to_port          = 0
    protocol         = "-1"
    cidr_blocks      = ["0.0.0.0/0"]
  }

  tags = {
    Name = "ec2_security_group"
  }
}

resource "aws_security_group" "rds_security_group" {
  name        = "rds_security_group"
  description = "Quaefacta app rds instance security group"
  vpc_id      = aws_vpc.VPC.id

  ingress {
    from_port        = 3306
    to_port          = 3306
    protocol         = "tcp"
    security_groups  = [aws_security_group.ec2_security_group.id]
  }

  tags = {
    Name = "rds_security_group"
  }
}

resource "aws_db_subnet_group" "rds_subnet_group" {
    name        = "rds_subnet_group"
    description = "The subnet group used by the Quaefacta app rds"
    subnet_ids  = [aws_subnet.PrivateSubnet1.id, aws_subnet.PrivateSubnet2.id]
}

resource "aws_instance" "ec2" {
  ami                         = "ami-09a5c873bc79530d9"
  associate_public_ip_address = true
  instance_type               = "t2.micro"
  key_name                    = aws_key_pair.deployer.key_name
  subnet_id                   = aws_subnet.PublicSubnet.id
  vpc_security_group_ids      = [aws_security_group.ec2_security_group.id]

  tags = {
    Name = "QuaefactaHealthAppEC2"
  }
}

resource "aws_db_instance" "db" {
  allocated_storage          = 20
  apply_immediately          = true
  auto_minor_version_upgrade = false
  db_name                    = "quaefactaHealthAppDb"
  db_subnet_group_name       = aws_db_subnet_group.rds_subnet_group.id
  engine                     = "mysql"
  engine_version             = "8.0"
  instance_class             = "db.t2.micro"
  max_allocated_storage      = 0
  multi_az                   = false
  network_type               = "IPV4"
  username                   = "admin"
  password                   = "5lAG0iOIpuETYTIUxm2X"
  port                       = 3306
  skip_final_snapshot        = true
  storage_type               = "gp2"
  vpc_security_group_ids     = [aws_security_group.rds_security_group.id]

  tags = {
    Name = "quaefactaHealthAppDb"
  }
}

resource "aws_kms_key" "key" {
}

resource "aws_s3_bucket" "bucket" {
  bucket = "quaefactadocumentupload"
}

resource "aws_s3_bucket_server_side_encryption_configuration" "sse_config" {
  bucket = aws_s3_bucket.bucket.bucket

  rule {
    apply_server_side_encryption_by_default {
      kms_master_key_id = aws_kms_key.key.arn
      sse_algorithm     = "aws:kms"
    }
  }
}

resource "aws_route53_zone" "route53_zone" {
  name = "digitalhealthwalletapp.com"
}

resource "aws_route53_record" "route53_record" {
  zone_id = aws_route53_zone.route53_zone.zone_id
  name    = "digitalhealthwalletapp.com"
  type    = "A"
  ttl     = "300"
  records = [aws_instance.ec2.public_ip]
}

output "instance_public_ip" {
  value = aws_instance.ec2.public_ip
}
