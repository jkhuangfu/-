#centos服务器启动pm2脚本
#!/bin/bash
check_port() {
        echo "正在检测服务是否完成启动。。。"
        netstat -tlpn | grep "\b$1\b"
}
start_server(){
    if check_port 3330
    then 
            echo "服务已经存在，无需启动"
            exit 1
    else 
            echo "服务不存在,正在启动中"
            pm2 start /usr/www/start.json
            sleep 3s
            echo "服务启动完毕"
            start_server
    fi
}
start_server