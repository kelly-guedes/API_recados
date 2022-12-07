import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { NoteEntity } from "./note-entity";

@Entity({ name: "users" })
export class UserEntity {
  @PrimaryColumn({ type: "uuid" })
  id!: string;

  @Column({ length: 100 })
  name!: string;

  @Column({ length: 100 })
  email!: string;

  @Column({ length: 50 })
  password!: string;

  @OneToMany(() => NoteEntity, (entity) => entity.userEntity)
  noteEntities?: NoteEntity[];
}
