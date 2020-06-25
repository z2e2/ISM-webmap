# ISM-webmap

#### How to run:
```
docker build . -t webism
docker images
docker run -p 8000:80 webism
docker rmi $(docker images -qf "dangling=true")
## save the compiled files to host
DOCKER_BUILDKIT=1 docker build --file Dockerfile --output build .
```
Can check the website at [http://localhost:8000](http://localhost:8000) in the browser.

#### Deploy on a server:
1. Dependencies:
* node version 10.20.1
* yarn version 1.22.4
* Python version 3.6.9
* MongoDB version 4.2.7

2. commands:
```
git clone https://github.com/z2e2/ISM-webmap.git
sudo cp -rf ISM-webmap/build/* /var/www/html/
sudo service nginx restart
```



#### Contributors:
This project is originated from [webmap](https://github.com/Karavangelas/webmap)
* Kleanthis Karavangelas
* Liam Shamir
* Dan Dunkers
* Karanveer Singh
* Dan Drzewicki
* Zhengqiao Zhao
* Bahrad A. Sokhansanj
* Gail L. Rosen

#### Methodology Reference:
This project is an interactive display of results presented in [ISM](https://github.com/EESI/ISM)
