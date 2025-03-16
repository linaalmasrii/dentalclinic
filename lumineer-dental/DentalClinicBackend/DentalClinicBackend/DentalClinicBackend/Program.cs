using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using DentalClinicBackend.Data;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// ✅ Ensure DB Connection String is Valid
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
if (string.IsNullOrEmpty(connectionString))
{
    throw new ArgumentException("⚠️ ERROR: PostgreSQL connection string is missing in appsettings.json.");
}

// ✅ Add PostgreSQL
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(connectionString));

// ✅ Fix CORS (Allow all origins TEMPORARILY)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy.WithOrigins("http://localhost:5173") // ✅ Explicitly set allowed origins
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials();
        });
});


// ✅ Ensure JWT Key is Set
var secretKey = builder.Configuration["Jwt:Key"];
if (string.IsNullOrEmpty(secretKey))
{
    Console.WriteLine("⚠️ Warning: JWT secret key is missing in appsettings.json. Authentication may fail.");
    secretKey = "DefaultSecretKey123456"; // Optional: Set a default key for debugging
}
var key = Encoding.UTF8.GetBytes(secretKey);

// ✅ Add JWT Authentication
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.RequireHttpsMetadata = false;
        options.SaveToken = true;
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(key),
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            RequireExpirationTime = true,
            ValidateLifetime = true
        };
    });

// ✅ Add Controllers
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

// ✅ Fix Swagger (Ensure OpenAPI 3.0 Compatibility)
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "DentalClinic API",
        Version = "3.0.0", // ✅ Ensure correct OpenAPI version
        Description = "API for managing dental clinic operations",
        Contact = new OpenApiContact
        {
            Name = "Support",
            Email = "support@example.com"
        }
    });

    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "JWT Authorization header using the Bearer scheme. Example: 'Bearer {token}'",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.Http,
        Scheme = "bearer",
        BearerFormat = "JWT"
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] { }
        }
    });
});

var app = builder.Build();

// ✅ Ensure Middleware Order is Correct
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseRouting();
app.UseCors("AllowFrontend");

app.UseAuthentication(); // ✅ Ensure authentication middleware is added
app.UseAuthorization();

app.MapControllers();

app.Run();
