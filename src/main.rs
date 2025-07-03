
use std::process::Command;

use actix_web::{ post, web, App, HttpResponse, HttpServer, Responder};
use actix_cors::Cors;
mod models;



#[post("/download")]
pub async fn download_video(req : web::Json<models::DownloadRequest>) -> impl Responder {
    let output = Command::new("yt-dlp")
        .args(&["-g", "-f", "b",  &req.url])
        .output();
    match output {
        Ok(o) => {
                HttpResponse::Ok()
                .content_type("text/plain; charset=utf-8")
                .body(o.stdout)

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