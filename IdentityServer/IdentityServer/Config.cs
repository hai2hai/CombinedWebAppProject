using IdentityServer4.Models;
using System.Collections.Generic;
using System.Security.Claims;
using System.Text.Json;
using IdentityModel;
using IdentityServer4;
using IdentityServer4.Test;

namespace IdentityServer
{
    public static class Config
    {
        public static List<TestUser> Users
        {
            get
            {
                var address = new
                {
                    street_address = "One Hacker Way",
                    locality = "Heidelberg",
                    postal_code = 69118,
                    country = "Germany"
                };

                return new List<TestUser>
        {
              new TestUser
              {
                SubjectId = "818727",
                Username = "alice",
                Password = "alice",
                Claims =
                {
                  new Claim(JwtClaimTypes.Name, "Alice Smith"),
                  new Claim(JwtClaimTypes.GivenName, "Alice"),
                  new Claim(JwtClaimTypes.FamilyName, "Smith"),
                  new Claim(JwtClaimTypes.Email, "AliceSmith@email.com"),
                  new Claim(JwtClaimTypes.EmailVerified, "true", ClaimValueTypes.Boolean),
                  new Claim(JwtClaimTypes.Role, "admin"),
                  new Claim(JwtClaimTypes.WebSite, "http://alice.com"),
                  new Claim(JwtClaimTypes.Address, JsonSerializer.Serialize(address),
                    IdentityServerConstants.ClaimValueTypes.Json)
                }
              },
              new TestUser
              {
                SubjectId = "88421113",
                Username = "bob",
                Password = "bob",
                Claims =
                {
                  new Claim(JwtClaimTypes.Name, "Bob Smith"),
                  new Claim(JwtClaimTypes.GivenName, "Bob"),
                  new Claim(JwtClaimTypes.FamilyName, "Smith"),
                  new Claim(JwtClaimTypes.Email, "BobSmith@email.com"),
                  new Claim(JwtClaimTypes.EmailVerified, "true", ClaimValueTypes.Boolean),
                  new Claim(JwtClaimTypes.Role, "user"),
                  new Claim(JwtClaimTypes.WebSite, "http://bob.com"),
                  new Claim(JwtClaimTypes.Address, JsonSerializer.Serialize(address),
                    IdentityServerConstants.ClaimValueTypes.Json)
                }
              }
            };
            }
        }

        public static IEnumerable<IdentityResource> IdentityResources =>
          new[]
          {
            new IdentityResources.OpenId(),
            new IdentityResources.Profile(),
            new IdentityResource
            {
              Name = "role",
              DisplayName = "Role",
              UserClaims = new List<string> {"role"}
            },
            new IdentityResources.Address(),
            new IdentityResources.Email()
          };

        public static IEnumerable<ApiScope> ApiScopes =>
          new[]
          {
            new ApiScope("webappapi")
          };
        public static IEnumerable<ApiResource> ApiResources => new[]
        {
          new ApiResource("webappapi")
          {
            Scopes = new List<string> {"webappapi"},
            ApiSecrets = new List<Secret> {new Secret("ScopeSecret".Sha256())},
            UserClaims = new List<string> {"role"}
          }
        };

        public static IEnumerable<Client> Clients =>
          new[]
          {
            new Client
            {
              ClientId = "jsclient",
               RequireClientSecret = false,

              AllowedGrantTypes = GrantTypes.Implicit,

              RedirectUris = {"http://localhost:3000/login.html"},
              FrontChannelLogoutUri = "https://localhost:5444/signout-oidc",
              PostLogoutRedirectUris = {"http://localhost:3000"},
              AllowOfflineAccess = true,
              AllowAccessTokensViaBrowser = true,
              AllowedScopes =
                {
                    "webappapi",
                    IdentityServerConstants.StandardScopes.Address,
                    IdentityServerConstants.StandardScopes.Email,
                    IdentityServerConstants.StandardScopes.Profile,
                    IdentityServerConstants.StandardScopes.OpenId,
                    "role"
                },
              RequirePkce = true,
              RequireConsent = false,
              AllowPlainTextPkce = false,
              AlwaysIncludeUserClaimsInIdToken = true,
              AlwaysSendClientClaims = true
            },
        };
    }
}