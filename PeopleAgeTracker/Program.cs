using Microsoft.EntityFrameworkCore;
using PeopleAgeTracker.Data;
using PeopleAgeTracker.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllersWithViews();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddDbContext<PeopleDBContext>(options => options.UseInMemoryDatabase(databaseName: "people"));
builder.Services.AddSwaggerGen();
builder.Services.AddTransient<SeedData>();
var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
    
}
app.UseSwagger();
app.UseSwaggerUI();
app.UseHttpsRedirection();
SeedDatabase();
app.UseStaticFiles();
app.UseRouting();

//app.MapSwagger();
app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html"); ;

app.Run();
void SeedDatabase() //can be placed at the very bottom under app.Run()
{
    using var scope = app.Services.CreateScope();
    var dbInitializer = scope.ServiceProvider.GetRequiredService<SeedData>();
    dbInitializer.Seed();
}