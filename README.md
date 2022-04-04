1. docker pull node:15.14  
15.14: Pulling from library/node
41f38ce3010a: Pull complete 
ce440adabe2a: Pull complete 
b7c0a158e8c1: Pull complete 
d82fbf846f6f: Pull complete 
c190b75eb2b4: Pull complete 
1ce0b6aec0ac: Pull complete 
d461dd6a01f5: Pull complete 
860542326137: Pull complete 
fba155217a46: Pull complete 
Digest: sha256:608bba799613b1ebf754034ae008849ba51e88b23271412427b76d60ae0d0627
Status: Downloaded newer image for node:15.14
docker.io/library/node:15.14

2. docker run --rm -d --name first_node -v /data node:15.14 ls /var/first/data
NODE_VERSION=15.14.0
HOSTNAME=da2717a1b8c7
YARN_VERSION=1.22.5
HOME=/root
NAME=Alexandr
TERM=xterm
PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
PWD=/
SURNAME=Salij

3. docker exec -it mynode bin/sh
echo Привет, $NAME $SURNAME!
Привет, Alexandr Salij!

4. docker stop mynode
mynode

5. docker rm mynode             
mynode

docker rmi node:15.14
Untagged: node:15.14
Untagged: node@sha256:608bba799613b1ebf754034ae008849ba51e88b23271412427b76d60ae0d0627
Deleted: sha256:c9b1cc6b53791ec5df6210b2d454d12b7a2f181f0a6b0e8f1210c8386473eba7
Deleted: sha256:f0dc5ef6846f0abefa37bc88337c02110e9e238881415ca1871dc2607b786342
Deleted: sha256:784ab9e2e6829251f4fb254d6316e01a98614d225f7cb9c58e2ac6a1ee4797a0
Deleted: sha256:9c7f8185bbc7e06911cf165c28a5807eb0192b2ac627ae633f171af40bd235dd
Deleted: sha256:ddc8c8426aa1933fa5d32a4da29e98ca985692706afa2f1c60975e749ec36aa1
Deleted: sha256:c413e10d9fb99f013b730701affa6aadbec9450a668f993b6c950031c62a1f16
Deleted: sha256:87bf19dbb220eb26f2ee81fdf55d72defc3e924a964e74f0e69fc358fa3c42cf
Deleted: sha256:be106a4e95a9b1906e0289515498911495c3027a49570c4c1f7629aa6e7eb33b
Deleted: sha256:2e550512412623943f8abceb74a40d22e4407bce50f418bda0375a4aaa51b075
Deleted: sha256:5a4eda0f02e647b06a20c608c6c130e1058c6415e2b223acefaa43b6c464aa1b
