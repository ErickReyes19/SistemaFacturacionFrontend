import React, { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox'; // Ajusta la ruta según tu estructura
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input'; // Para el buscador
import { Permiso } from '@/lib/Types';

interface PermissionCheckboxesProps {
  permisos: Permiso[];
  permisosIds: string[];
  onChange: (permisoId: string) => void;
}

const PermissionCheckboxes: React.FC<PermissionCheckboxesProps> = ({ permisos, permisosIds, onChange }) => {
  const [searchTerm, setSearchTerm] = useState(''); // Estado para el buscador

  const handleCheckboxChange = (permisoId: string) => {
    onChange(permisoId);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Filtrar permisos según el término de búsqueda
  const filteredPermisos = permisos.filter((permiso) =>
    permiso.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="mb-4">
        {/* Buscador */}
        <Input
          type="text"
          placeholder="Buscar permisos..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full p-2 border rounded-md"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredPermisos.map((permiso) => (
          <div key={permiso.permisoId} className="flex items-center space-x-2 p-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition duration-200">
            <Checkbox
              id={permiso.permisoId}
              checked={permisosIds.includes(permiso.permisoId)}
              onCheckedChange={() => handleCheckboxChange(permiso.permisoId)}
              className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <Label htmlFor={permiso.permisoId} className="text-gray-700 font-medium">
              {permiso.nombre}
            </Label>
          </div>
        ))}
      </div>

      {filteredPermisos.length === 0 && (
        <div className="text-gray-500">No se encontraron permisos.</div>
      )}
    </div>
  );
};

export default PermissionCheckboxes;
