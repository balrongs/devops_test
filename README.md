# 🚀 DevOps Demo — CI/CD Pipeline

Demo de pipeline CI/CD completo: cada `push` a `main` dispara automáticamente:

```
Commit → Build → Test → Deploy → AWS S3 (producción)
```

En ~1 minuto el cambio está live.

---

## ⚙️ Setup

### 1. Crear bucket S3

```bash
aws s3api create-bucket --bucket devops-demo-pipeline --region us-east-1
aws s3api put-bucket-website --bucket devops-demo-pipeline \
  --website-configuration '{"IndexDocument":{"Suffix":"index.html"}}'
aws s3api put-public-access-block --bucket devops-demo-pipeline \
  --public-access-block-configuration \
  "BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false"
aws s3api put-bucket-policy --bucket devops-demo-pipeline \
  --policy '{"Version":"2012-10-17","Statement":[{"Effect":"Allow","Principal":"*","Action":"s3:GetObject","Resource":"arn:aws:s3:::devops-demo-pipeline/*"}]}'
```

### 2. Agregar Secrets en GitHub

Ir al repo → **Settings → Secrets and variables → Actions**

| Secret | Valor |
|--------|-------|
| `AWS_ACCESS_KEY_ID` | Access key del usuario IAM |
| `AWS_SECRET_ACCESS_KEY` | Secret key del usuario IAM |

### 3. URL de producción

```
http://devops-demo-pipeline.s3-website-us-east-1.amazonaws.com
```

---

## 🎯 La demo

1. Abrir en el browser la URL de producción
2. Editar `src/index.html` línea con `<!-- ✏️ CAMBIA ESTA LÍNEA EN LA DEMO -->`
3. Commit y push:
```bash
git add src/index.html
git commit -m "feat: cambio en vivo"
git push origin main
```
4. Mostrar GitHub Actions corriendo
5. Refrescar la URL → cambio live en ~1 minuto

---

## 📁 Estructura

```
devops-demo/
├── .github/workflows/pipeline.yml  ← Pipeline CI/CD
├── src/index.html                  ← Página (edita esto en la demo)
├── tests/smoke.test.js             ← 8 smoke tests
└── package.json
```

---

## 🧪 Tests locales

```bash
npm test
```
