FROM node

RUN npm install -g firebase-tools

COPY docker-entrypoint.sh /docker-entrypoint.sh

WORKDIR "/app"
VOLUME "/app"

ENTRYPOINT ["/docker-entrypoint.sh"]
CMD []
