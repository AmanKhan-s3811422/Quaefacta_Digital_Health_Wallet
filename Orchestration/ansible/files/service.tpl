[Unit]
Description= Service to start a React server
After=network.target

[Service]
Type=simple
ExecStart=/usr/bin/npm start --prefix /home/ubuntu/quaefacta
Environment=NODE_ENV=production
WorkingDirectory=/home/ubuntu/quaefacta
StandardOutput=inherit
StandardError=inherit
Restart=on-failure
User=ubuntu

[Install]
WantedBy=multi-user.target