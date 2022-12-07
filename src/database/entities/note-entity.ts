import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { UserEntity } from "./user-entity";

@Entity({ name: "notes" })
export class NoteEntity {
  @PrimaryColumn()
  id!: string;

  @Column()
  description!: string;

  @Column()
  archived!: boolean;

  @Column({ name: "create_at" })
  createAt!: Date;

  @Column({ name: "update_at" })
  updateAt!: Date;

  @Column({ name: "id_user" })
  userID!: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: "id_user", referencedColumnName: "id" })
  userEntity?: UserEntity;
}
