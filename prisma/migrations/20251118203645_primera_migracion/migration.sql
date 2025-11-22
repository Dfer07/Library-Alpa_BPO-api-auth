-- CreateTable
CREATE TABLE "Autores" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "nacionalidad" TEXT,
    "fecha_nacimiento" TIMESTAMP(3),

    CONSTRAINT "Autores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Libros" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "isbn" TEXT NOT NULL,
    "año_publicacion" INTEGER,
    "genero" TEXT,
    "disponible" BOOLEAN NOT NULL DEFAULT true,
    "autor_id" INTEGER NOT NULL,

    CONSTRAINT "Libros_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Libros_isbn_key" ON "Libros"("isbn");

-- AddForeignKey
ALTER TABLE "Libros" ADD CONSTRAINT "Libros_autor_id_fkey" FOREIGN KEY ("autor_id") REFERENCES "Autores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
