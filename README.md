# Streaming music app

Fullstack cinema app based on NextJS and NestJS , MongoDB ,Redux-Toolkit and TailwindCSS

## Features

- Creating an account

- Authorization(User and Admin role)

- Admin Panel(Create | Update | Delete , movie,genres,actors and users )

- You can watch movie

- Change rating for a movie

- Add movie to favorites

- Admin can assign a user the role of admin



##Getting started

1. Install the required packages
```bash
  cd front && yarn install
  cd back && yarn install
```

2. Update the .env files in the front & back
    ```bash
    cp front/.env.example .env
    cp back/.env.example .env
    ```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file.

- .env in back
 ```bash
   'NODE_ENV=development'
   'MONGO_URI=mongodb://127.0.0.1:27017/your-database'
   'JWT_SECRET=set of letters, numbers and symbols(as2r3eaffgas02@@!!sghkl)'
 ```
- .env in front
 ```bash
   'REACT_APP_URL=http://localhost:3000'
   'REACT_APP_SERVER_URL = http://localhost:4200'
   'REACT_APP_ENV=development'
 ```

## Run Locally

Start the back & front
   
    ```bash
    cd back && yarn dev
    cd front && yarn dev
    ```



Start the app in production

```bash
  yarn build
```

then

```bash
  yarn start
```

## Screenshots 
https://s9.gifyu.com/images/cinemaGif.gif

![Screenshot_4](https://user-images.githubusercontent.com/83369962/209806132-90210ae3-c97c-436d-a30c-e6cc24a542b5.png)

![Screenshot_1](https://user-images.githubusercontent.com/83369962/209805439-0792079b-606c-46f4-8fe4-e6b1bc38810a.png)

![Screenshot_2](https://user-images.githubusercontent.com/83369962/209805552-a9964901-c944-44ba-b080-0798f96cfb04.png)

![Screenshot_3](https://user-images.githubusercontent.com/83369962/209805697-5076621e-f000-4a70-9869-626a37e1deb6.png)

