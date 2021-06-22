import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from 'src/app/error/error.service';
import { ComplianceFile } from './../../models/compliance-file';
import { ComplianceFileService } from './../compliance-file.service';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss']
})
export class FilesComponent implements OnInit {
  @Input() files: ComplianceFile[] = [];

  loading: boolean = false;
  display: boolean = false;
  displayEdit: boolean = false;

  complianceId = this.route.snapshot.params.id;

  file = new ComplianceFile();

  constructor(
    private complianceFileService: ComplianceFileService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private errorService: ErrorService,
  ) { }

  ngOnInit(): void {
  }

  showEdit(file: ComplianceFile): void {
    this.displayEdit = true;
    this.file = file;
  }

  showCreate(): void {
    this.display = true;
    this.file = new ComplianceFile();
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.file.file = file;
    }
  }

  create(form: NgForm): void {
    this.loading = true;
    const formData = new FormData();
    formData.append('file', this.file.file);
    formData.append('description', this.file.description);
    formData.append('idCompliance', this.complianceId);

    this.complianceFileService.create(formData)
      .then((result) => {
        this.files.push(result);
        this.display = false;
        form.reset();
        this.toastr.success('Anexo adicionado!');
      })
      .catch((error) => this.errorService.handle(error))
      .finally(() => this.loading = false);
  }

  update(): void {
    this.loading = true;
    delete this.file.file;
    this.complianceFileService.update(this.file)
      .then(() => {
        this.displayEdit = false;
        this.toastr.success('Informações salvas com sucesso!');
      })
      .catch((error) => this.errorService.handle(error))
      .finally(() => this.loading = false)
  }
}
