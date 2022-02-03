import { MigrationInterface, QueryRunner, Table } from "typeorm";

class CreateProduct1643923486213 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "products",
        columns: [
          {
            name: "id",
            type: "char",
            length: "36",
            isPrimary: true,
          },
          {
            name: "name",
            type: "varchar",
            isUnique: true,
          },
          {
            name: "slug",
            type: "varchar",
            isUnique: true,
          },
          {
            name: "cover",
            type: "varchar",
          },
          {
            name: "category_id",
            type: "char",
            length: "36",
            isNullable: true,
          },
          {
            name: "value",
            type: "float",
          },
          {
            name: "description",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("products");
  }
}
export { CreateProduct1643923486213 };
