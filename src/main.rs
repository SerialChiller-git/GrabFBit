
use std::process::Command;

use actix_web::{ post, web, App, HttpResponse, HttpServer, Responder};
use actix_cors::Cors;
mod models;



#[post("/download")]
pub async fn download_video(req : web::Json<models::DownloadRequest>) -> impl Responder {
    let output = Command::new("yt-dlp")
        .args(&["-g",  &req.url])
        .output();
    match output {
        Ok(o) => {
            if o.status.success() {
                HttpResponse::Ok()
                .append_header(("Content-Disposition", "attachment; filename=\"kek.mp4\""))
                .body(o.stdout)
            }
            else{
                HttpResponse::BadRequest().body("Error: Failed to download video")
            }
        }
        Err(e) => HttpResponse::InternalServerError().body(format!("Error: {}", e)),
    }

}




#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        let cors = Cors::default()
            .allow_any_origin()
            .allow_any_method()
            .allow_any_header();    


        App::new()
        .wrap(cors)
        .service(download_video)
    })
    .bind("0.0.0.0:8080")?
    .run()
    .await
}