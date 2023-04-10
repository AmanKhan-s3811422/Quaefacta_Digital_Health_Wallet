# QueafactaHealthMk2 Orchestration

## Terraform

### Description

Terraform can be used to build and destory AWS infrastructure. 

This README will explain the process of setting up Terraform and using the main.tf Terraform script.

Part of this process includes installing Terraform and the AWS CLI, an AWS account is also required.


### Install Terraform

Terraform can be downloaded from the following link: https://www.terraform.io/downloads

Depending on your operating system you may need to add it to the system path manually (for windows).

An in depth tutorial on the installation process and use with AWS can be found here: https://learn.hashicorp.com/tutorials/terraform/install-cli?in=terraform/aws-get-started


### Install AWS CLI
 
AWS CLI can be downloaded by following the instructions at: https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html#getting-started-install-instructions


### SETUP AWS CLI

To use your AWS IAM credentials you will need to set the AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY environment variables.
```
export AWS_ACCESS_KEY_ID=
```
```
export AWS_SECRET_ACCESS_KEY=
```


### Terraform Script

#### Accessing the Terraform Script

Open main.tf in your text editor of choice to view the terraform script. This script contains all the information to create the AWS infrastructure for the Quaefacta health web application.

### Setup the Terraform project directory
Before running the Terraform script it is a good idea to initialise the terraform-aws directory in which it is located.

This can be done with the following line in your command prompt:
```
terraform init
```

#### Creating and Updating AWS Infrastructure

You can create or update the AWS infrastructure outlined in the main.tf terraform script by running the following command:

```
terraform apply
```

In the case of updating the AWS infrastucture, any changes to the main.tf script will be used to update the neccessary AWS resources.

You will be prompted with a list of actions that Terraform will perform and confirmation that you want to perform these actions you can answer with 'yes' to continue.

You have now created the AWS infrastructure for the Quaefacta Health web application, you can view it online on the AWS website.

When you run the terraform apply command you will receive an output with the public IP address for the ec2 instance. You can ssh into this ec2 instance using PuTTY which can be downloaded from https://www.putty.org/. The private key to connect to the ec2 instance is the QuaefactaKey.ppk file so be sure to add this file to the private key file for authentication section in PuTTY before connecting.

#### Destroying the AWS Infrastructure

To terminate the resources managed in this Terraform project you can use the command:
```
terraform destroy
```

Please note that this command will only terminate AWS infrastructure that was created by the terraform apply command so the rest of your AWS resources will not be affected.


## Ansible

### Description

Ansible can be used to deply a series of commands to our AWS EC2 instance.

The Ansible playbook 'playbook.yml' contains the commands to upload the frontend application to an EC2 instance and make this application accessible over the internet.

This README will explain the process of installing ansible, updating the ansible script ip address and running the ansible script

### Install Ansible

To install Ansible on an ubuntu system you can follow the instructions on this web page https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html

### Updating Ansible Script IP

Before running the ansible script you'll need to update the IP address. In the Ansible folder you can find a file named 'playbook.yml'. This file can be edditted in any simple text editor. 

Go to the 7th line and you will see a web_ip variable, replace the numbers listed with the public IP address of the AWS EC2 instance you wish to connect to (the Terraform script will output the public IP address for the EC2 instance it creates, you can directly copy and paste this into the script).

Be sure to save the script before closing.

### Adding Application to File Folder

The application needs to be added to the files directory located in the ansible directory for the script to run.

It is important that the application is compressed with the .tgz file extension - this can be done in your Ubuntu terminal with the command:
```
tar -cvzf application.tgz <path to application folder>
```
 Now the ansible playbook can be run

### Running the Ansible Playbook

To run the Ansible playbook access the Ansible folder in your terminal and enter the following command with the <EC2 instance public IP> replaced with the EC2 instance public IP:
```
sudo ansible-playbook --private-key ../QuaefactaKey.pem -i ubuntu@<EC2 instance public IP> playbook.yml
```

This command will connect to the EC2 instance using the QuaefactaKey.pem private key and run the ansible playbook - running the frontend application and making it accessible to the internet. To connect to this application you can enter the EC2 instance public IP followed by ':5000' into your web browser. Or go to digitalhealthwalletapp.com

