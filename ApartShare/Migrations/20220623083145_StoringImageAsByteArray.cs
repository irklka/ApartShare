using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ApartShare.Migrations
{
    public partial class StoringImageAsByteArray : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImageBase64",
                table: "Users");

            migrationBuilder.AddColumn<byte[]>(
                name: "ImageBase64ByteArray",
                table: "Users",
                type: "varbinary(max)",
                nullable: false,
                defaultValue: new byte[0]);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImageBase64ByteArray",
                table: "Users");

            migrationBuilder.AddColumn<string>(
                name: "ImageBase64",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
