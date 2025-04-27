using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DentalClinicBackend.Migrations
{
    /// <inheritdoc />
    public partial class CorrectDoctorModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PhoneNumber",
                table: "Doctors");

            migrationBuilder.RenameColumn(
                name: "Email",
                table: "Doctors",
                newName: "ImageUrl");

            migrationBuilder.AddColumn<string>(
                name: "Title",
                table: "Doctors",
                type: "character varying(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Title",
                table: "Doctors");

            migrationBuilder.RenameColumn(
                name: "ImageUrl",
                table: "Doctors",
                newName: "Email");

            migrationBuilder.AddColumn<string>(
                name: "PhoneNumber",
                table: "Doctors",
                type: "character varying(20)",
                maxLength: 20,
                nullable: false,
                defaultValue: "");
        }
    }
}
