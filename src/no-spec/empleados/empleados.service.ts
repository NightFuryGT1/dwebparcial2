import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Empleado } from './entities/empleado.entity';
import { CreateEmpleadoDto } from './dto/create-empleado.dto';
import { UpdateEmpleadoDto } from './dto/update-empleado.dto';

@Injectable()
export class EmpleadosService {
  constructor(
    @InjectRepository(Empleado)
    private readonly empleadoRepo: Repository<Empleado>,
  ) {}

  create(createEmpleadoDto: CreateEmpleadoDto) {
    const nuevoEmpleado = this.empleadoRepo.create(createEmpleadoDto);
    return this.empleadoRepo.save(nuevoEmpleado);
  }

  findAll() {
    return this.empleadoRepo.find();
  }

  async findOne(id: string) {
    const empleado = await this.empleadoRepo.findOne({ where: { id } });
    if (!empleado) {
      throw new NotFoundException(`Empleado con ID ${id} no encontrado`);
    }
    return empleado;
  }

  async update(id: string, updateEmpleadoDto: UpdateEmpleadoDto) {
    const empleado = await this.findOne(id);
    const updatedEmpleado = Object.assign(empleado, updateEmpleadoDto);
    return this.empleadoRepo.save(updatedEmpleado);
  }

  async remove(id: string) {
    const empleado = await this.findOne(id);
    return this.empleadoRepo.remove(empleado);
  }
}
