FROM amitevski/docker-node-build:4

COPY ./package.json /var/loco/package.json
RUN cd /var/loco && npm install

# use project typings for now as we seem to have some special config here
COPY ./typings.json /var/loco/typings.json
RUN cd /var/loco && typings install

COPY . /var/loco
RUN cd /var/loco && npm run build


ENV PORT=80
EXPOSE 80
WORKDIR /var/loco
CMD ["node", "dist/es5/loco.js"]
