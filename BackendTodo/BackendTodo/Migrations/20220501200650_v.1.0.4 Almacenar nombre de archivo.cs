using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BackendTodo.Migrations
{
    public partial class v104Almacenarnombredearchivo : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "archivoNombre",
                table: "Todo",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "archivoNombre",
                table: "Todo");
        }
    }
}
