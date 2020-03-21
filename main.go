package main

func main() {
	a := App{}
	a.Initialize("rclonemanager", "sql", "rclone")
	a.Run(":8080")
}
