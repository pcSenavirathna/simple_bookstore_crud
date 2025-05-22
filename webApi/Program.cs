
using webApi.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(Options => Options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.MapControllers();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(Options =>
{
    Options.AllowAnyHeader();
    Options.AllowAnyMethod();
    Options.AllowAnyOrigin();
});

app.UseHttpsRedirection();

app.Run();