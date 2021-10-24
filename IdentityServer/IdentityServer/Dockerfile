# Using multi stage build as per https://docs.docker.com/engine/examples/dotnetcore/
FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build-env
WORKDIR /app

COPY ["IdentityServer.csproj", "./"]
RUN dotnet restore "IdentityServer.csproj"

COPY . .
RUN dotnet publish -c Debug -o out

# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:5.0
WORKDIR /app

COPY --from=build-env /app/out .
EXPOSE 5000
ENTRYPOINT ["dotnet", "IdentityServer.dll"]
