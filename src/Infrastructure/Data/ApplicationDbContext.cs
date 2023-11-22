﻿using System.Reflection;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using SkillSphere.Domain.Entities;
using SkillSphere.Application.Common.Interfaces;
using SkillSphere.Infrastructure.Identity;

namespace skillSphere.Infrastructure.Data;

public class ApplicationDbContext : IdentityDbContext<ApplicationUser>, IApplicationDbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

    public DbSet<TodoList> TodoLists => Set<TodoList>();

    public DbSet<TodoItem> TodoItems => Set<TodoItem>();
    
    public DbSet<Course> Courses => Set<Course>();
    
    public DbSet<Category> Categories => Set<Category>();
    
    public DbSet<CourseCategory> CourseCategories => Set<CourseCategory>();
    
    public DbSet<Chapter> Chapters => Set<Chapter>();

    
    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

        base.OnModelCreating(builder);
    }
}
