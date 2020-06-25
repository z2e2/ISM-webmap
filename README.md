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
