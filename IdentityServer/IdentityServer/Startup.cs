using System;
using System.IdentityModel.Tokens.Jwt;
using System.Reflection;
using IdentityServer.Data;
using IdentityServer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace IdentityServer
{
    public class Startup
    {
        public IConfiguration Configuration { get; set; }

        public IWebHostEnvironment Environment { get; set; }

        public Startup(IWebHostEnvironment environment, IConfiguration configuration)
        {
            Environment = environment;
            Configuration = configuration;
            JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();
        }

        public void ConfigureServices(IServiceCollection services)
        {
            var connectionString = Configuration.GetConnectionString("DefaultConnection");
            var migrationsAssembly = typeof(Startup).GetTypeInfo().Assembly.GetName().Name;

            var serverVersion = new MySqlServerVersion(new Version(8, 0, 26));

            services.AddDbContext<ApplicationDbContext>(options =>
            {
                options.UseMySql(connectionString, serverVersion, mysqlOptions =>
                {
                    mysqlOptions.MigrationsAssembly(migrationsAssembly);
                });
            });

            services.AddIdentity<IdentityUser, IdentityRole>().AddEntityFrameworkStores<ApplicationDbContext>();

            services.AddIdentityServer()
                    .AddAspNetIdentity<IdentityUser>()
                    .AddConfigurationStore(options =>
                    {
                        options.ConfigureDbContext = builder => builder.UseMySql(connectionString, serverVersion, options => options.MigrationsAssembly(migrationsAssembly));
                    })

                    .AddOperationalStore(options =>
                    {
                        options.ConfigureDbContext = builder => builder.UseMySql(connectionString, serverVersion, options => options.MigrationsAssembly(migrationsAssembly));
                        options.EnableTokenCleanup = true;
                    })
                    .AddDeveloperSigningCredential();

            services.AddCors(setup =>
            {
                setup.AddDefaultPolicy(policy =>
                {
                    policy.AllowAnyHeader();
                    policy.AllowAnyMethod();
                    policy.AllowAnyOrigin();
                });
            });

            services.AddControllersWithViews();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCors();
            app.UseStaticFiles();
            app.UseHttpsRedirection();
            app.UseRouting();
            app.UseIdentityServer();
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoint => endpoint.MapDefaultControllerRoute());
        }
    }
}
