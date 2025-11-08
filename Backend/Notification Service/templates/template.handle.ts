import path from "path";
import fs from "fs/promises";
import Handlebars from "handlebars";
export default async function renderMailTemplate(
  templateId: string,
  params: Record<string, any>
) {
  const templatePath = path.join(
    __dirname,
    "mailer",
    `${templateId}.template.hbs`
  );

  try {
    const content = await fs.readFile(templatePath, "utf-8");
    const finalTemplate = Handlebars.compile(content);
    return finalTemplate(params);
  } catch (error: unknown) {
    throw new Error("Error in template Handlebars");
  }
}
