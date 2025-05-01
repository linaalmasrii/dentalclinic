using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DentalClinicBackend.Migrations
{
    /// <inheritdoc />
    public partial class AddDoctorToService : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "DoctorId",
                table: "Services",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Services_DoctorId",
                table: "Services",
                column: "DoctorId");

            migrationBuilder.AddForeignKey(
                name: "FK_Services_Doctors_DoctorId",
                table: "Services",
                column: "DoctorId",
                principalTable: "Doctors",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Services_Doctors_DoctorId",
                table: "Services");

            migrationBuilder.DropIndex(
                name: "IX_Services_DoctorId",
                table: "Services");

            migrationBuilder.DropColumn(
                name: "DoctorId",
                table: "Services");
        }
    }
}
