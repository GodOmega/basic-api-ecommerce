# Basic Ecommerce API
###  Description
Welcome to my basic backend API proyect, I started this project to practice my Node skills and to experience the flow of basic ecommerce.

> **Note: If you want to know in depth about some architecture and technical decisions, go to the bottom of this readme.**

### Installation
#### Step 1
**1.**  Make sure you have a version of Node greater than or equal to 16.

**2.**  Download this repository.

**3.** run: ```npm install ``` in you command line to download all dependencies.

#### Step 2
**1.**  Prepare a SQL based database** (I recommend Mysql or MariaDB for this proyect)**.

**2.**  Copy .env.example content inside of a new .env and fill the env variables, for example:

![](https://res.cloudinary.com/dqd4krsof/image/upload/v1672176786/README%20IMAGES/BASIC%20API%20ECOMMERCE/a_a9wvea.png)

> **Test variables are for run the unit, integration and end to end tests**

**3.** run `npm run migrations:run` to generate migrations in your database table.

**4.** run `npm start` to start the server or `npm run dev` in case you want to be in development mode. 

> If you want to see the API documentation you need to run the server in Development mode and go to **/docs** route, you will see the full route in your console when run the server.

![](https://res.cloudinary.com/dqd4krsof/image/upload/v1672177754/README%20IMAGES/BASIC%20API%20ECOMMERCE/docs_fago3w.png)

### Run Testing
In case you want to modify the proyect and test if all features still working, you can follow this steps:

**1.** Make sure you filled all test database env variables because you need them for e2e tests **(you dont need run migrations to run tests)**.
> I recommend create a second table for testing.

**2.**  You can run all the tests or separate e2e tests, for example:

`npm run test` **<-- command to run all tests**

`npm run test:general`** <-- command to run unit and integration tests **

`npm run test:e2e` **<-- command to run end to end tests**

------------


### Explanation of decisions

Hello there, if you got this far it means you read the whole readme (or just skipped to the end 🥸),  first of all thanks for taking a look at my project I really appreciate it. Now, I will give a little context on some of the decisions I made in building this project that you might be interested in:

- You will probably notice that the folder architecture is a bit complex for a basic project, in this case I wanted to take clean architecture a bit further than just making generic folders, so I took some inspiration from the hexagonal architecture and based the project on independent modules.

- When you are using the API you will surely notice that you have to do several manual processes such as: creating the shopping cart before adding items and placing an order. This is because I focused mainly on practicing both architecture and clean and scalable code over the flow of use of a common ecommerce (this is what I meant with basic), that is the reason why I did not add a user system and why this is only a Backend project, because I did not want to get too complicated.

-  Finally the last explanation is about the tests, you will almost certainly wonder why I used two different test libraries. The reason is very funny, at the beginning I was performing my unit and integration tests with jest without any problem and I was thinking to perform the end to end tests with this library, but.... I found a huge difficulty when trying to do this kind of tests because apparently sequelize and jest don't get along very well (at least in what I tried to do) 😅, so I decided to try with mocha and I found that it was ridiculously easy and fast to do, and since I had other tests already done in jest I decided to continue with both libraries.