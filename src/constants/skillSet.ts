type SkillSet = {
  kind: string;
  bgColor: string;
  textColor: string;
  name: string;
};
export const skillSet: { [key: string]: SkillSet[] } = {
  Infra: [
    {
      kind: "aws",
      bgColor: "bg-orange-50",
      textColor: "text-orange-500",
      name: "S3",
    },
    {
      kind: "aws",
      bgColor: "bg-orange-50",
      textColor: "text-orange-500",
      name: "Lambda",
    },
    {
      kind: "aws",
      bgColor: "bg-orange-50",
      textColor: "text-orange-500",
      name: "Glue",
    },
    {
      kind: "aws",
      bgColor: "bg-orange-50",
      textColor: "text-orange-500",
      name: "EMR",
    },
    {
      kind: "aws",
      bgColor: "bg-orange-50",
      textColor: "text-orange-500",
      name: "VPC",
    },
    {
      kind: "aws",
      bgColor: "bg-orange-50",
      textColor: "text-orange-500",
      name: "ECS",
    },
    {
      kind: "aws",
      bgColor: "bg-orange-50",
      textColor: "text-orange-500",
      name: "Step Functions",
    },
  ],
  IaC: [
    {
      kind: "aws",
      bgColor: "bg-orange-50",
      textColor: "text-orange-500",
      name: "CDK",
    },
    {
      kind: "aws",
      bgColor: "bg-orange-50",
      textColor: "text-orange-500",
      name: "Cloudformation",
    },
    {
      kind: "OSS",
      bgColor: "bg-indigo-50",
      textColor: "text-indigo-500",
      name: "Terraform",
    },
  ],
  "Programming Language": [
    {
      kind: "OSS",
      bgColor: "bg-indigo-50",
      textColor: "text-indigo-500",
      name: "Python",
    },
    {
      kind: "OSS",
      bgColor: "bg-indigo-50",
      textColor: "text-indigo-500",
      name: "TypeScript",
    },
    {
      kind: "OSS",
      bgColor: "bg-indigo-50",
      textColor: "text-indigo-500",
      name: "Java",
    },
  ],
  "CI/CD": [
    {
      kind: "OSS",
      bgColor: "bg-indigo-50",
      textColor: "text-indigo-500",
      name: "Github Actions",
    },
    {
      kind: "aws",
      bgColor: "bg-orange-50",
      textColor: "text-orange-500",
      name: "Code family",
    },
  ],
  "DB/DWH": [
    {
      kind: "OSS",
      bgColor: "bg-indigo-50",
      textColor: "text-indigo-500",
      name: "PostgreSQL",
    },
    {
      kind: "aws",
      bgColor: "bg-orange-50",
      textColor: "text-orange-500",
      name: "Redshit",
    },
    {
      kind: "Snowflake",
      bgColor: "bg-orange-50",
      textColor: "text-orange-500",
      name: "Snowflake",
    },
  ],
  "Source Code Management": [
    {
      kind: "OSS",
      bgColor: "bg-indigo-50",
      textColor: "text-indigo-500",
      name: "Github",
    },
  ],
  Tool: [
    {
      kind: "OSS",
      bgColor: "bg-indigo-50",
      textColor: "text-indigo-500",
      name: "dbt",
    },
    {
      kind: "OSS",
      bgColor: "bg-indigo-50",
      textColor: "text-indigo-500",
      name: "Airbyte",
    },
    {
      kind: "OSS",
      bgColor: "bg-indigo-50",
      textColor: "text-indigo-500",
      name: "Apache Airflow",
    },
    {
      kind: "OSS",
      bgColor: "bg-indigo-50",
      textColor: "text-indigo-500",
      name: "Apache Spark (PySpark)",
    },
  ],
};
