#FROM node:8-alpine as build
#WORKDIR /app
#COPY . .
#RUN yarn install
#RUN npm i -g pkg
#RUN yarn build && yarn pkg
#
#FROM alpine
#WORKDIR /app
#COPY --from=build /app/pkg ./
#EXPOSE 11601
#CMD pwd && ls && ./eos-sign-validator
#

#FROM alpine
#WORKDIR /app
#COPY ./pkg .
#EXPOSE 11601
#CMD pwd && ls && ./eos-sign-validator

#FROM ubuntu:19.04
#WORKDIR /app
#COPY ./pkg_linux .
#EXPOSE 11601
#CMD pwd && ls && ./eos-sign-validator

FROM debian:stable-slim
WORKDIR /app
COPY ./pkg_linux .
EXPOSE 11601
CMD pwd && ls && ./eos-sign-validator
