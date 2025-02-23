﻿using Microsoft.EntityFrameworkCore.Migrations;

namespace QuickBuy.Repositorio.Migrations
{
    public partial class CargaFormaPagamento : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "FormasPagamento",
                columns: new[] { "Id", "Descricao", "Nome" },
                values: new object[] { 1, "Forma de Pagamento do tipo Boleto.", "Boleto" });

            migrationBuilder.InsertData(
                table: "FormasPagamento",
                columns: new[] { "Id", "Descricao", "Nome" },
                values: new object[] { 2, "Forma de Pagamento do tipo Cartão de Crédito.", "Cartão de Crédito" });

            migrationBuilder.InsertData(
                table: "FormasPagamento",
                columns: new[] { "Id", "Descricao", "Nome" },
                values: new object[] { 3, "Forma de Pagamento do tipo Depósito.", "Depósito" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "FormasPagamento",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "FormasPagamento",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "FormasPagamento",
                keyColumn: "Id",
                keyValue: 3);
        }
    }
}
