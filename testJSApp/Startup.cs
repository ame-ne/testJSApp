using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using testJSApp.Models;

namespace testJSApp
{
    public class Startup
    {
        public IConfiguration Configuration { get; }

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer(
                    Configuration["ConnectionStrings:DefaultConnection"]));

            services.AddTransient<ITestService, EFQuestionRepository>();
            services.AddMemoryCache();
            services.AddSession();

            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddMvc();
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            app.UseSession();
            app.UseStaticFiles();
            app.UseMvc(route => {
                route.MapRoute(
                    name: "api",
                    template: "api/{controller}/{id?}",
                    defaults: new { controller = "TestService" }
                );
                route.MapRoute(
                    name: "default",
                    template: "{controller}/{action}/{id?}",
                    defaults: new { controller = "Home", action = "Index" }
                );
            }
            );
        
        }
    }
}
