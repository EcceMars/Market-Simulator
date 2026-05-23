/*
    Base class for all data templates. Nomenclature is 'name'Res for templates and 'name'Obj for instances.
    E.g. StructureRes is the template for any StructureObje of the same type.
*/
export interface GenericData {
    icon:string;
    name:string;
    description:string;
}