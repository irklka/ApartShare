using ApartShare.Data;
using ApartShare.Helpers;
using ApartShare.Models.Interfaces;
using ApartShare.Models.Repository;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddCors();

//builder.Services.AddCors(options =>
//{
//    options.AddDefaultPolicy(
//        builder =>
//        {
//            builder.WithOrigins("https://localhost:44469")
//                    .AllowAnyHeader()
//                    .AllowAnyMethod()
//                    .AllowCredentials();
//        });
//});

builder.Services.AddDbContext<UserContext>(
        options => options.UseSqlServer(builder.Configuration.GetConnectionString("Default")));

builder.Services.AddControllers();
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
builder.Services.AddScoped<JwtService>();


builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();

app.UseStaticFiles();
app.UseRouting();

//app.UseCors();

app.UseCors(options => options
    .WithOrigins(@"https://localhost:44469")
    .AllowAnyHeader()
    .AllowAnyMethod()
    .AllowCredentials()
);

//app.UseAuthentication();
//app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("index.html");

app.Run();
