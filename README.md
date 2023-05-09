We will be building an API for the purpose of accessing application data programmatically. The intention here is to mimic the building of a real world backend service (such as reddit) which should provide this information to the front end architecture.

In order to successfully conenct to the two databases locally you will need to add the following files;

.env-development
within this add the database name PGDATABASE=nc_games
.env-test
within this add the database name PGDATABASE=nc_games_test

You will then need to add these two file names to you .gitignore file