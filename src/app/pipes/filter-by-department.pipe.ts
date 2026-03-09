import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByDepartment',
  standalone: true
})
export class FilterByDepartmentPipe implements PipeTransform {
  transform<T extends { department: string }>(
    items: T[],
    department: string
  ): T[] {
    if (!department || !items) {
      return items;
    }

    return items.filter((item) =>
      item.department.toLowerCase().includes(department.toLowerCase())
    );
  }
}
