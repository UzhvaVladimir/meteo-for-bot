import { Column, DataType, Model, Table } from "sequelize-typescript";
@Table({ tableName: "users" })
export class User extends Model{
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false
  })
  username: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false
  })
  email: string;

  @Column({
    type: DataType.STRING,
    unique: false,
    allowNull: false
  })
  password: string;
}