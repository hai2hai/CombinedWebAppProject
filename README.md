# CombinedWebAppProject

-	Run docker-compose up.
-	From the IdentityServer project folder run these scripts in command line to migrate necessary tables to the database:
o	update-database -context PersistedGrantDbContext
o	update-database -context ConfigurationDbContext
o	update-database -context ApplicationDbContext
-	From the IdentityServer project folder run this script in command line to seed test data
o	dotnet run bin/Debug/netcoreapp3.1/IdentityService /seed
-	From the Server folder run this script in command line to seed test data
o	npx sequelize-cli db:seed:all --url mysql://root:12345@localhost:3306/my-react-app.
- After running the scripts successfully, we can access the project main page via http://localhost:3000.
