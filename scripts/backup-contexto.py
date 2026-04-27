import os, zipfile, datetime

def backup():
    fecha = datetime.date.today().isoformat()
    os.makedirs("backups", exist_ok=True)
    destino = f"backups/CTX-backup-{fecha}.zip"
    with zipfile.ZipFile(destino, "w") as z:
        for root, dirs, files in os.walk("contexto"):
            for file in files:
                z.write(os.path.join(root, file))
    print(f"✅ Backup creado: {destino}")

backup()
