#!/bin/bash
TARGET_DIR=/var/www/nokware.net

sudo cp -R public/* $TARGET_DIR
sudo chown -R www-data:www-data $TARGET_DIR
sudo chmod -R g+w $TARGET_DIR
