using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ApartShare.Migrations
{
    public partial class StoringImageAsByteArrayNULLABLEApartments : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImageBase64",
                table: "Apartments");

            migrationBuilder.AddColumn<byte[]>(
                name: "ImageBase64ByteArray",
                table: "Apartments",
                type: "varbinary(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImageBase64ByteArray",
                table: "Apartments");

            migrationBuilder.AddColumn<string>(
                name: "ImageBase64",
                table: "Apartments",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
