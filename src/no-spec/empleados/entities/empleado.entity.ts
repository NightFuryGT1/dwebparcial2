import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Empleado {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  nombre: string;

  @Column('text')
  puesto: string;

  @Column('decimal', { precision: 10, scale: 2 })
  salario: number;

  @Column('text', { nullable: true })
  departamento: string;

  @Column('text', { nullable: true })
  extension_telefonica: string;
}
