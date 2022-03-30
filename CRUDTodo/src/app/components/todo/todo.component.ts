import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  listTodos: any[] = [];
  form: FormGroup;
  toastTiemOut: number;
  accion = 'Crear';
  id: number | undefined;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private _todoService: TodoService
  ) {
    this.toastTiemOut = 1500;
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      estado: ['', Validators.required],
      archivo: [''],
    });
  }

  ngOnInit(): void {
    this.obtenerTodos();
  }

  obtenerTodos() {
    this._todoService.getListTodo().subscribe(
      (data) => {
        this.listTodos = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  guardarTodo() {
    const todo: any = {
      nombre: this.form.get('nombre')?.value,
      estado: this.form.get('estado')?.value,
      archivo: this.form.get('archivo')?.value,
    };

    if (this.id == undefined) {
      this._todoService.createTodo(todo).subscribe(
        (data) => {
          this.toastr.success('El TODO fue creado', 'TODO Creado', {
            timeOut: this.toastTiemOut,
          });
          this.form.reset();
          this.obtenerTodos();
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      todo.id = this.id;
      this._todoService.updateTodo(this.id, todo).subscribe(
        (data) => {
          this.form.reset();
          this.accion = 'crear';
          this.id = undefined;
          this.toastr.info(
            'El TODO fue actualizado con exito',
            'TODO actualizado'
          );
          this.obtenerTodos();
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  eliminarTodo(id: number) {
    this._todoService.deleteTodo(id).subscribe(
      (data) => {
        this.toastr.error('El TODO fue eliminado', 'TODO Eliminado', {
          timeOut: this.toastTiemOut,
        });
        this.obtenerTodos();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  editarTodo(todo: any) {
    this.accion = 'Editar';
    this.id = todo.id;
    this.form.patchValue({
      nombre: todo.nombre,
      estado: todo.estado,
      archivo: todo.archivo,
    });
  }
}
