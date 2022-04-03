# netologyNodeJS

1. docker pull busybox
sing default tag: latest
latest: Pulling from library/busybox
aa5434a6d997: Pull complete 
Digest: sha256:caa382c432891547782ce7140fb3b7304613d3b0438834dce1cad68896ab110a
Status: Downloaded newer image for busybox:latest
docker.io/library/busybox:latest

2. docker run -i -t --name pinger busybox ping netology.ru
PING netology.ru (188.114.99.128): 56 data bytes
64 bytes from 188.114.99.128: seq=0 ttl=37 time=6.739 ms
64 bytes from 188.114.99.128: seq=1 ttl=37 time=17.905 ms
64 bytes from 188.114.99.128: seq=2 ttl=37 time=18.904 ms
64 bytes from 188.114.99.128: seq=3 ttl=37 time=19.306 ms
64 bytes from 188.114.99.128: seq=4 ttl=37 time=10.056 ms
64 bytes from 188.114.99.128: seq=5 ttl=37 time=16.424 ms
64 bytes from 188.114.99.128: seq=6 ttl=37 time=18.243 ms
64 bytes from 188.114.99.128: seq=7 ttl=37 time=21.086 ms

3. docker ps -a
CONTAINER ID   IMAGE     COMMAND              CREATED         STATUS                     PORTS     NAMES
c305a3b8554f   busybox   "ping netology.ru"   3 minutes ago   Exited (0) 2 minutes ago             pinger

4. docker logs -f -t pinger
2022-04-03T17:30:18.195172419Z PING netology.ru (188.114.99.128): 56 data bytes
2022-04-03T17:30:18.201871378Z 64 bytes from 188.114.99.128: seq=0 ttl=37 time=6.739 ms
2022-04-03T17:30:19.219316837Z 64 bytes from 188.114.99.128: seq=1 ttl=37 time=17.905 ms
2022-04-03T17:30:20.223138462Z 64 bytes from 188.114.99.128: seq=2 ttl=37 time=18.904 ms
2022-04-03T17:30:21.226903462Z 64 bytes from 188.114.99.128: seq=3 ttl=37 time=19.306 ms
2022-04-03T17:30:22.223256005Z 64 bytes from 188.114.99.128: seq=4 ttl=37 time=10.056 ms
2022-04-03T17:30:23.235653588Z 64 bytes from 188.114.99.128: seq=5 ttl=37 time=16.424 ms
2022-04-03T17:30:24.239364506Z 64 bytes from 188.114.99.128: seq=6 ttl=37 time=18.243 ms
2022-04-03T17:30:25.247855798Z 64 bytes from 188.114.99.128: seq=7 ttl=37 time=21.086 ms
2022-04-03T17:30:26.248661507Z 64 bytes from 188.114.99.128: seq=8 ttl=37 time=20.927 ms
2022-04-03T17:30:27.247367715Z 64 bytes from 188.114.99.128: seq=9 ttl=37 time=17.216 ms
2022-04-03T17:30:28.259742383Z 64 bytes from 188.114.99.128: seq=10 ttl=37 time=23.700 ms
2022-04-03T17:30:29.260260800Z 64 bytes from 188.114.99.128: seq=11 ttl=37 time=18.403 ms
2022-04-03T17:30:30.259764508Z 64 bytes from 188.114.99.128: seq=12 ttl=37 time=13.702 ms
2022-04-03T17:30:31.259584634Z 64 bytes from 188.114.99.128: seq=13 ttl=37 time=8.881 ms
2022-04-03T17:30:32.271758801Z 64 bytes from 188.114.99.128: seq=14 ttl=37 time=18.709 ms
2022-04-03T17:30:33.275992843Z 64 bytes from 188.114.99.128: seq=15 ttl=37 time=19.733 ms
2022-04-03T17:30:34.279917885Z 64 bytes from 188.114.99.128: seq=16 ttl=37 time=23.177 ms
2022-04-03T17:30:35.279670761Z 64 bytes from 188.114.99.128: seq=17 ttl=37 time=19.263 ms
2022-04-03T17:30:36.271892386Z 64 bytes from 188.114.99.128: seq=18 ttl=37 time=10.592 ms
2022-04-03T17:30:37.284074137Z 64 bytes from 188.114.99.128: seq=19 ttl=37 time=21.393 ms
2022-04-03T17:30:38.288782554Z 64 bytes from 188.114.99.128: seq=20 ttl=37 time=20.070 ms
2022-04-03T17:30:39.283846846Z 64 bytes from 188.114.99.128: seq=21 ttl=37 time=9.628 ms
2022-04-03T17:30:40.296037222Z 64 bytes from 188.114.99.128: seq=22 ttl=37 time=16.060 ms
2022-04-03T17:30:41.300221389Z 64 bytes from 188.114.99.128: seq=23 ttl=37 time=18.754 ms
2022-04-03T17:30:42.265759083Z 64 bytes from 188.114.99.128: seq=24 ttl=37 time=16.647 ms
2022-04-03T17:30:43.278641875Z 64 bytes from 188.114.99.128: seq=25 ttl=37 time=22.768 ms
2022-04-03T17:30:44.274111709Z 64 bytes from 188.114.99.128: seq=26 ttl=37 time=16.000 ms
2022-04-03T17:30:45.285973376Z 64 bytes from 188.114.99.128: seq=27 ttl=37 time=22.666 ms

2022-04-03T17:30:45.387212960Z --- netology.ru ping statistics ---
2022-04-03T17:30:45.387259043Z 28 packets transmitted, 28 packets received, 0% packet loss
2022-04-03T17:30:45.387264543Z round-trip min/avg/max = 6.739/17.391/23.700 ms

5. docker start pinger 
pinger

6. docker ps                                              
CONTAINER ID   IMAGE     COMMAND              CREATED         STATUS          PORTS     NAMES
c305a3b8554f   busybox   "ping netology.ru"   8 minutes ago   Up 13 seconds             pinger


7. docker logs -f -t pinger
2022-04-03T17:49:22.159717546Z PING netology.ru (188.114.99.128): 56 data bytes
2022-04-03T17:49:22.170237838Z 64 bytes from 188.114.99.128: seq=0 ttl=37 time=10.448 ms
2022-04-03T17:49:23.185662630Z 64 bytes from 188.114.99.128: seq=1 ttl=37 time=22.981 ms
....
2022-04-03T17:51:17.612023877Z 64 bytes from 188.114.99.128: seq=115 ttl=37 time=20.939 ms
2022-04-03T17:51:18.615243586Z 64 bytes from 188.114.99.128: seq=116 ttl=37 time=22.152 ms
2022-04-03T17:51:19.604068212Z 64 bytes from 188.114.99.128: seq=117 ttl=37 time=9.323 ms
2022-04-03T17:51:20.619383712Z 64 bytes from 188.114.99.128: seq=118 ttl=37 time=23.457 ms
 всего 118 запросов

8. docker rm pinger
pinger

9. docker rmi busybox
Untagged: busybox:latest
Untagged: busybox@sha256:caa382c432891547782ce7140fb3b7304613d3b0438834dce1cad68896ab110a
Deleted: sha256:d38589532d9756ff743d2149a143bfad79833261ff18c24b22088183a651ff65
Deleted: sha256:57d0c5e3b21e4fdac106cfee383d702b92cd433e6e45588153228670b616bc59