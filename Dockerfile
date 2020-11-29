# FROM node:12.18.2 as build

# ARG REACT_APP_SERVICES_HOST=/coupon

# WORKDIR /app

# COPY ./package.json /app/package.json
# # COPY ./package-lock.json /app/package-lock.json

# RUN yarn install

# COPY . .

# RUN yarn build

# CMD [ "yarn", "start" ]

FROM nginx
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

# COPY --from=build /app/build /usr/share/nginx/html


