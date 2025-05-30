#!/bin/sh

# バックアップ設定
BACKUP_DIR="/backups"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
DB_HOST="postgres"
DB_PORT="5432"
DB_NAME="${POSTGRES_DB:-blog_db}"
DB_USER="${POSTGRES_USER:-bloguser}"

# バックアップディレクトリを作成
mkdir -p ${BACKUP_DIR}/daily
mkdir -p ${BACKUP_DIR}/weekly
mkdir -p ${BACKUP_DIR}/monthly

echo "Starting backup service..."

while true; do
    # 現在の時刻を取得
    HOUR=$(date +%H)
    DAY_OF_WEEK=$(date +%u)
    DAY_OF_MONTH=$(date +%d)
    
    # 毎日午前3時にデイリーバックアップ
    if [ "$HOUR" = "03" ]; then
        echo "Performing daily backup..."
        BACKUP_FILE="${BACKUP_DIR}/daily/backup_daily_${TIMESTAMP}.sql"
        
        pg_dump -h ${DB_HOST} -p ${DB_PORT} -U ${DB_USER} -d ${DB_NAME} > ${BACKUP_FILE}
        
        if [ $? -eq 0 ]; then
            echo "Daily backup completed: ${BACKUP_FILE}"
            # 7日以上前のデイリーバックアップを削除
            find ${BACKUP_DIR}/daily -name "*.sql" -mtime +7 -delete
        else
            echo "Daily backup failed!"
        fi
    fi
    
    # 毎週日曜日の午前4時にウィークリーバックアップ
    if [ "$HOUR" = "04" ] && [ "$DAY_OF_WEEK" = "7" ]; then
        echo "Performing weekly backup..."
        BACKUP_FILE="${BACKUP_DIR}/weekly/backup_weekly_${TIMESTAMP}.sql"
        
        pg_dump -h ${DB_HOST} -p ${DB_PORT} -U ${DB_USER} -d ${DB_NAME} > ${BACKUP_FILE}
        
        if [ $? -eq 0 ]; then
            echo "Weekly backup completed: ${BACKUP_FILE}"
            # 4週間以上前のウィークリーバックアップを削除
            find ${BACKUP_DIR}/weekly -name "*.sql" -mtime +28 -delete
        else
            echo "Weekly backup failed!"
        fi
    fi
    
    # 毎月1日の午前5時にマンスリーバックアップ
    if [ "$HOUR" = "05" ] && [ "$DAY_OF_MONTH" = "01" ]; then
        echo "Performing monthly backup..."
        BACKUP_FILE="${BACKUP_DIR}/monthly/backup_monthly_${TIMESTAMP}.sql"
        
        pg_dump -h ${DB_HOST} -p ${DB_PORT} -U ${DB_USER} -d ${DB_NAME} > ${BACKUP_FILE}
        
        if [ $? -eq 0 ]; then
            echo "Monthly backup completed: ${BACKUP_FILE}"
            # 12ヶ月以上前のマンスリーバックアップを削除
            find ${BACKUP_DIR}/monthly -name "*.sql" -mtime +365 -delete
        else
            echo "Monthly backup failed!"
        fi
    fi
    
    # 1時間待機
    sleep 3600
done