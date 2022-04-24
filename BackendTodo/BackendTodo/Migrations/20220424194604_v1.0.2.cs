using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BackendTodo.Migrations
{
    public partial class v102 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "nombre",
                table: "Todo",
                newName: "descripcion");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "descripcion",
                table: "Todo",
                newName: "nombre");
        }
    }
}
