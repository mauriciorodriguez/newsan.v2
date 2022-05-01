using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BackendTodo.Migrations
{
    public partial class v103Almacenartipodearchivo : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "archivoTipo",
                table: "Todo",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "archivoTipo",
                table: "Todo");
        }
    }
}
